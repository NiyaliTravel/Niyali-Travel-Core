# CleanEnv.ps1 — removes BOMs and non-ASCII characters from .env
$envPath = ".\.env"

if (Test-Path $envPath) {
    $cleanLines = Get-Content $envPath | ForEach-Object {
        $_ -replace '[^\u0000-\u007F]', ''  # Remove non-ASCII characters
    }

    $cleanLines | Set-Content -Encoding UTF8 $envPath
    Write-Host "✅ .env cleaned and saved as UTF-8 (no BOM)"
} else {
    Write-Host "❌ .env file not found in current directory."
}