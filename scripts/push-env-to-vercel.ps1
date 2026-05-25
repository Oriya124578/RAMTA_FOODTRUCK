# Pushes every variable in .env.local to Vercel (production + preview + development).
# Run AFTER `npx vercel login` and `npx vercel link`.

$envFile = Join-Path $PSScriptRoot ".." ".env.local"
if (-not (Test-Path $envFile)) {
  Write-Error ".env.local not found"
  exit 1
}

$envs = @("production", "preview", "development")

Get-Content $envFile | ForEach-Object {
  $line = $_.Trim()
  if ($line -eq "" -or $line.StartsWith("#")) { return }
  $idx = $line.IndexOf("=")
  if ($idx -lt 1) { return }
  $key = $line.Substring(0, $idx).Trim()
  $val = $line.Substring($idx + 1).Trim()
  if ($val -eq "") { return }

  foreach ($env in $envs) {
    Write-Host "→ $key ($env)" -ForegroundColor Cyan
    # Remove existing (ignore errors), then add fresh
    npx vercel env rm $key $env --yes 2>$null | Out-Null
    $val | npx vercel env add $key $env
  }
}

Write-Host "`nDone. Run: npx vercel --prod" -ForegroundColor Green
