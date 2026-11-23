// Traces the black-on-white logo JPEG into an SVG path with macOS Vision (contour detection).
//   swift scripts/trace-logo.swift <logo.jpg> <out.svg> [epsilon] [min shape height, 0-1]
// A min height of 0.1 keeps only the big AS monogram strokes and drops the small lettering.
import Vision
import AppKit
let a = CommandLine.arguments
let eps = Float(a.count > 3 ? a[3] : "0.0007")!
let minH = a.count > 4 ? Double(a[4])! : 0
let src = NSImage(contentsOfFile: a[1])!
// upscale 4x with smoothing, then threshold, so contours follow the letterforms, not JPEG blocks
let S = 4.0
let W = Int(src.size.width * S), H = Int(src.size.height * S)
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: W, pixelsHigh: H, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
NSGraphicsContext.current!.imageInterpolation = .high
src.draw(in: NSRect(x: 0, y: 0, width: W, height: H))
NSGraphicsContext.restoreGraphicsState()
let ci = CIImage(bitmapImageRep: rep)!
let req = VNDetectContoursRequest()
req.detectsDarkOnLight = true
req.contrastAdjustment = 1.5
req.maximumImageDimension = 2048
try! VNImageRequestHandler(ciImage: ci).perform([req])
let obs = req.results!.first!
var d = ""
func emit(_ c: VNContour) {
  let pts = (try? c.polygonApproximation(epsilon: eps))?.normalizedPoints ?? c.normalizedPoints
  if pts.count < 3 { return }
  for (i, p) in pts.enumerated() {
    let x = Double(p.x) * 1000, y = (1 - Double(p.y)) * 1000 * Double(H) / Double(W)
    d += (i == 0 ? "M" : "L") + String(format: "%.1f %.1f", x, y)
  }
  d += "Z"
}
func walk(_ c: VNContour) {
  // skip tiny specks (JPEG noise)
  let b = c.normalizedPath.boundingBox
  if b.width * b.height > 0.00002 && Double(b.height) >= minH { emit(c); for ch in c.childContours { walk(ch) } }
}
for c in obs.topLevelContours { walk(c) }
let vh = Int(1000.0 * Double(H) / Double(W))
let svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 \(vh)\"><path fill-rule=\"evenodd\" d=\"\(d)\"/></svg>\n"
try! svg.write(toFile: a[2], atomically: true, encoding: .utf8)
print("contours:", obs.contourCount, "bytes:", svg.utf8.count)
