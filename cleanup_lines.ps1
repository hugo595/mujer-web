$dir = "c:\Users\erick\Desktop\mujer web"
$files = Get-ChildItem -Path "$dir\pages" -Filter "*.html" -Recurse
$files += Get-ChildItem -Path "$dir\index.html"

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $original = $content
    
    # Remove common combinations of border-top that look "reddish" in dark mode
    $content = $content.Replace('border-top: 1px solid var(--color-border)', 'border-top: none')
    $content = $content.Replace('border-top: 4px solid var(--color-accent)', 'border-top: none')
    
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content)
        Write-Host "Cleaned horizontal line in: $($f.Name)"
    }
}
Write-Host "Cleanup complete."
