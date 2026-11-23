// Pulls full-resolution stills from the brand film into media-src/images, cropped to 2:3 from the
// top so the burned-in subtitles (bottom tenth of the frame) never reach the site.
//
//   swift scripts/extract-stills.swift <film.mp4> <outdir> name@seconds [name@seconds ...]
import AVFoundation
import AppKit

let a = CommandLine.arguments
let gen = AVAssetImageGenerator(asset: AVURLAsset(url: URL(fileURLWithPath: a[1])))
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero
for spec in a[3...] {
  let p = spec.split(separator: "@")
  let cg = try! gen.copyCGImage(at: CMTime(seconds: Double(p[1])!, preferredTimescale: 600), actualTime: nil)
  let h = min(cg.height, cg.width * 3 / 2)
  let crop = cg.cropping(to: CGRect(x: 0, y: 0, width: cg.width, height: h))!
  let data = NSBitmapImageRep(cgImage: crop).representation(using: .jpeg, properties: [.compressionFactor: 0.95])!
  try! data.write(to: URL(fileURLWithPath: "\(a[2])/\(p[0]).jpg"))
  print("\(p[0]).jpg \(cg.width)x\(h)")
}
