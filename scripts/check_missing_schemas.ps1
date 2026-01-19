$csvPath = 'src\Mapping Card API-Level 2-20250328-20260114-level 2 new.csv'
$csv = Import-Csv -Path $csvPath -Encoding UTF8
$attrs = $csv | Select-Object -ExpandProperty 'Attribute name (EN)' | Sort-Object -Unique
$results = @()
foreach ($a in $attrs) {
    $n = $a -replace '/', '_'
    $parts = -split $n -split '[_ ]+' 
    $parts = $parts | Where-Object { $_ -ne '' }
    $pascal = ($parts | ForEach-Object { if ($_ -match '^[A-Z]{2,}$') { $_ } else { $_.Substring(0,1).ToUpper() + $_.Substring(1) } }) -join ''
    $file = Join-Path -Path "src\components\schemas" -ChildPath "$pascal.yaml"
    $exists = Test-Path $file
    $results += [PSCustomObject]@{attribute=$a; schema=$pascal; file=$file; exists=$exists}
}
$results | Where-Object { -not $_.exists } | Format-Table -AutoSize
$results | Where-Object { -not $_.exists } | Export-Csv -Path scripts\missing_schemas.csv -NoTypeInformation -Encoding UTF8
Write-Host "Wrote scripts\missing_schemas.csv"
