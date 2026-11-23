// Encodes the brand film for the web with macOS's own AVFoundation (no ffmpeg needed).
//
//   swift scripts/encode-video.swift <src> <out.mp4> <h264|hevc> <width> <height> <kbps> <audio 0|1> [segments]
//
// segments: comma-separated "start-end" seconds, joined in order (e.g. "10.85-11.6,30.58-31.54").
// Omit to encode the whole file. Output is fast-start (moov first) so it streams.
import AVFoundation

let a = CommandLine.arguments
guard a.count >= 8 else { print("usage: see header"); exit(1) }
let src = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let outURL = URL(fileURLWithPath: a[2])
let codec: AVVideoCodecType = a[3] == "hevc" ? .hevc : .h264
let W = Int(a[4])!, H = Int(a[5])!, kbps = Int(a[6])!, withAudio = a[7] == "1"
let vSrc = src.tracks(withMediaType: .video)[0]
let aSrc = src.tracks(withMediaType: .audio).first

// 1. Join the segments into one composition.
let comp = AVMutableComposition()
let vT = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
let aT = withAudio && aSrc != nil ? comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) : nil
var ranges: [CMTimeRange] = []
if a.count > 8 {
  for s in a[8].split(separator: ",") {
    let p = s.split(separator: "-").map { Double($0)! }
    ranges.append(CMTimeRange(start: CMTime(seconds: p[0], preferredTimescale: 600), end: CMTime(seconds: p[1], preferredTimescale: 600)))
  }
} else { ranges = [CMTimeRange(start: .zero, duration: src.duration)] }
var cursor = CMTime.zero
for r in ranges {
  try! vT.insertTimeRange(r, of: vSrc, at: cursor)
  if let aT, let aSrc { try! aT.insertTimeRange(r, of: aSrc, at: cursor) }
  cursor = CMTimeAdd(cursor, r.duration)
}

// 2. Decode, scale and re-encode at a fixed bitrate.
let reader = try! AVAssetReader(asset: comp)
let vComp = AVMutableVideoComposition(propertiesOf: comp)
vComp.renderSize = CGSize(width: W, height: H)
vComp.frameDuration = CMTime(value: 1, timescale: 30)
let ins = AVMutableVideoCompositionInstruction()
ins.timeRange = CMTimeRange(start: .zero, duration: comp.duration)
let li = AVMutableVideoCompositionLayerInstruction(assetTrack: vT)
let n = vT.naturalSize
li.setTransform(CGAffineTransform(scaleX: CGFloat(W) / n.width, y: CGFloat(H) / n.height), at: .zero)
ins.layerInstructions = [li]
vComp.instructions = [ins]
let vOut = AVAssetReaderVideoCompositionOutput(videoTracks: [vT], videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
vOut.videoComposition = vComp
reader.add(vOut)
var aOut: AVAssetReaderAudioMixOutput? = nil
if let aT {
  let o = AVAssetReaderAudioMixOutput(audioTracks: [aT], audioSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
  reader.add(o); aOut = o
}

try? FileManager.default.removeItem(at: outURL)
let writer = try! AVAssetWriter(outputURL: outURL, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
var props: [String: Any] = [AVVideoAverageBitRateKey: kbps * 1000, AVVideoMaxKeyFrameIntervalKey: 60, AVVideoExpectedSourceFrameRateKey: 30]
if codec == .h264 { props[AVVideoProfileLevelKey] = AVVideoProfileLevelH264HighAutoLevel; props[AVVideoH264EntropyModeKey] = AVVideoH264EntropyModeCABAC }
let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: codec, AVVideoWidthKey: W, AVVideoHeightKey: H, AVVideoCompressionPropertiesKey: props])
vIn.expectsMediaDataInRealTime = false
writer.add(vIn)
var aIn: AVAssetWriterInput? = nil
if aOut != nil {
  let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 44100, AVEncoderBitRateKey: 96000])
  writer.add(i); aIn = i
}

reader.startReading()
writer.startWriting()
writer.startSession(atSourceTime: .zero)
let g = DispatchGroup()
func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderOutput, _ q: String) {
  g.enter()
  input.requestMediaDataWhenReady(on: DispatchQueue(label: q)) {
    while input.isReadyForMoreMediaData {
      if let sb = output.copyNextSampleBuffer() { input.append(sb) } else { input.markAsFinished(); g.leave(); return }
    }
  }
}
pump(vIn, vOut, "v")
if let aIn, let aOut { pump(aIn, aOut, "a") }
g.wait()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
if writer.status != .completed { print("FAILED", writer.error ?? "", reader.error ?? ""); exit(1) }
let size = (try! FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as! Int)
print(String(format: "%@  %.1fs  %.2f MB", outURL.lastPathComponent, CMTimeGetSeconds(comp.duration), Double(size) / 1_048_576))
