param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath,
    [switch]$DryRun
)

$content = Get-Content $FilePath -Raw -Encoding UTF8

$fixes = @{}
$fixes["Ã¤"] = "ä"
$fixes["Ã¶"] = "ö"
$fixes["Ã„"] = "Ä"
$fixes["Ã–"] = "Ö"
$fixes["Ã…"] = "Å"
$fixes["Ã¥"] = "å"
$fixes["ÃƒÂ¤"] = "ä"
$fixes["ÃƒÂ¶"] = "ö"
$fixes["ÃƒÂ„"] = "Ä"
$fixes["ÃƒÂ–"] = "Ö"
$fixes["Ã²"] = "ò"
$fixes["Ã©"] = "é"
$fixes["Ã¨"] = "è"
$fixes["Ã "] = "à"
$fixes["Ã¼"] = "ü"
$fixes["Ã°Å¸â€ Ëœ"] = "🆘"
$fixes["Ã°Å¸Â§Â "] = "🧠"
$fixes["Ã°Å¸â€™"] = "💚"
$fixes["â€ž"] = '"'
$fixes["â€"] = '"'
$fixes["â€™"] = "'"
$fixes["¶"] = ""

$fixed = $content

foreach ($pattern in $fixes.Keys) {
    # Escape the pattern for regex
    $escapedPattern = [regex]::Escape($pattern)
    $fixed = $fixed -replace $escapedPattern, $fixes[$pattern]
}

if ($DryRun) {
    Write-Output "Would fix $FilePath"
    return
}

# Remove BOM if present via Encoding setting
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($FilePath, $fixed, $utf8NoBom)
Write-Output "✅ Fixed $FilePath"
