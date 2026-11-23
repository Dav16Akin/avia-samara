// Turns the portrait (9:16) brand film into a landscape hero: three portrait columns side by side,
// each its own run of shots, in one video file. Each column is scaled so the burned-in subtitles
// (the bottom eighth of every frame) fall below its crop, which frees the whole film for the edit.
//
//   swift scripts/encode-triptych.swift <src> <out.mp4> <h264|hevc> <kbps> <width> <height> <gutter> "<col1>" "<col2>" "<col3>"
//
// a column: comma-separated "start-end" seconds. All three are trimmed to the shortest.
import AVFoundation

let a = CommandLine.arguments
guard a.count == 11 else { print("usage: see header"); exit(1) }
let src = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let outURL = URL(fileURLWithPath: a[2])
let codec: AVVideoCodecType = a[3] == "hevc" ? .hevc : .h264
let kbps = Int(a[4])!, W = Int(a[5])!, H = Int(a[6])!, gutter = Int(a[7])!
let colW = (W - 2 * gutter) / 3
let vSrc = src.tracks(withMediaType: .video)[0]
let n = vSrc.naturalSize   // 720 x 1280

func ranges(_ s: String) -> [CMTimeRange] {
  s.split(separator: ",").map { seg in
    let p = seg.split(separator: "-").map { Double($0)! }
    return CMTimeRange(start: CMTime(seconds: p[0], preferredTimescale: 600), end: CMTime(seconds: p[1], preferredTimescale: 600))
  }
}

let comp = AVMutableComposition()
var tracks: [AVMutableCompositionTrack] = []
var durations: [CMTime] = []
for c in 0..<3 {
  let t = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  var cursor = CMTime.zero
  for r in ranges(a[8 + c]) { try! t.insertTimeRange(r, of: vSrc, at: cursor); cursor = CMTimeAdd(cursor, r.duration) }
  tracks.append(t); durations.append(cursor)
}
let dur = durations.min()!

// scale: the column's height reaches only 87% down the source frame (the subtitles start near 88%)
let scale = max(CGFloat(H) / (0.87 * n.height), CGFloat(colW) / n.width)
let cropW = CGFloat(colW) / scale, cropH = CGFloat(H) / scale
let cropX = (n.width - cropW) / 2

let vComp = AVMutableVideoComposition()
vComp.renderSize = CGSize(width: W, height: H)
vComp.frameDuration = CMTime(value: 1, timescale: 30)
let ins = AVMutableVideoCompositionInstruction()
ins.timeRange = CMTimeRange(start: .zero, duration: dur)
ins.backgroundColor = CGColor(red: 0.05, green: 0.047, blue: 0.043, alpha: 1)
ins.layerInstructions = tracks.enumerated().map { (i, t) in
  let li = AVMutableVideoCompositionLayerInstruction(assetTrack: t)
  li.setCropRectangle(CGRect(x: cropX, y: 0, width: cropW, height: cropH), at: .zero)
  let tx = CGFloat(i * (colW + gutter)) - cropX * scale
  li.setTransform(CGAffineTransform(scaleX: scale, y: scale).concatenating(CGAffineTransform(translationX: tx, y: 0)), at: .zero)
  return li
}
vComp.instructions = [ins]

let reader = try! AVAssetReader(asset: comp)
reader.timeRange = CMTimeRange(start: .zero, duration: dur)
let vOut = AVAssetReaderVideoCompositionOutput(videoTracks: tracks, videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
vOut.videoComposition = vComp
reader.add(vOut)

try? FileManager.default.removeItem(at: outURL)
let writer = try! AVAssetWriter(outputURL: outURL, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
var props: [String: Any] = [AVVideoAverageBitRateKey: kbps * 1000, AVVideoMaxKeyFrameIntervalKey: 60, AVVideoExpectedSourceFrameRateKey: 30]
if codec == .h264 { props[AVVideoProfileLevelKey] = AVVideoProfileLevelH264HighAutoLevel; props[AVVideoH264EntropyModeKey] = AVVideoH264EntropyModeCABAC }
let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: codec, AVVideoWidthKey: W, AVVideoHeightKey: H, AVVideoCompressionPropertiesKey: props])
writer.add(vIn)
reader.startReading(); writer.startWriting(); writer.startSession(atSourceTime: .zero)
let done = DispatchSemaphore(value: 0)
vIn.requestMediaDataWhenReady(on: DispatchQueue(label: "v")) {
  while vIn.isReadyForMoreMediaData {
    if let sb = vOut.copyNextSampleBuffer() { vIn.append(sb) } else { vIn.markAsFinished(); writer.finishWriting { done.signal() }; return }
  }
}
done.wait()
if writer.status != .completed { print("FAILED", writer.error ?? "", reader.error ?? ""); exit(1) }
let size = (try! FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as! Int)
print(String(format: "%@  %.1fs  %dx%d  %.2f MB", outURL.lastPathComponent, CMTimeGetSeconds(dur), W, H, Double(size) / 1_048_576))
