$ErrorActionPreference = "Stop"
$root = [IO.Path]::GetFullPath($PSScriptRoot)
$listener = $null
$prefix = $null
foreach ($port in 8765..8775) {
  $tryPrefix = "http://127.0.0.1:$port/"
  $candidate = New-Object System.Net.HttpListener
  $candidate.Prefixes.Add($tryPrefix)
  try {
    $candidate.Start()
    $listener = $candidate
    $prefix = $tryPrefix
    break
  } catch {
    $candidate.Close()
  }
}
if (-not $listener) {
  Write-Host "Could not listen on ports 8765-8775."
  exit 1
}
Write-Host "Catalog studio: $prefix"
Write-Host "Keep this window open while you edit."
Start-Process $prefix
$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".txt"  = "text/plain; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"
  ".gif"  = "image/gif"
}
while ($listener.IsListening) {
  $context = $listener.GetContext()
  try {
    $rel = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
    if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }
    $rel = $rel -replace "/", [IO.Path]::DirectorySeparatorChar
    $full = [IO.Path]::GetFullPath((Join-Path $root $rel))
    $rootFull = [IO.Path]::GetFullPath($root)
    $rootPrefix = $rootFull.TrimEnd("\", "/") + [IO.Path]::DirectorySeparatorChar
    if (-not ($full.Equals($rootFull, [StringComparison]::OrdinalIgnoreCase) -or $full.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase))) {
      $context.Response.StatusCode = 403
    } elseif ((Test-Path -LiteralPath $full) -and -not (Get-Item -LiteralPath $full).PSIsContainer) {
      $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
      $bytes = [IO.File]::ReadAllBytes($full)
      $type = $mime[$ext]
      if (-not $type) { $type = "application/octet-stream" }
      $context.Response.ContentType = $type
      $context.Response.ContentLength64 = $bytes.LongLength
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
    }
  } catch {
    $context.Response.StatusCode = 500
  } finally {
    $context.Response.Close()
  }
}
