$excelPath = "$(Split-Path -Path $PSScriptRoot -Parent)\src\Mapping Card API-Level 2-20250328-20260114.xlsx"
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false
$wb = $xl.Workbooks.Open($excelPath)
$ws = $wb.Worksheets.Item(1)
$used = $ws.UsedRange
$rows = $used.Rows.Count
$cols = $used.Columns.Count
# read headers
$headers = @()
for ($c = 1; $c -le $cols; $c++){
    $val = $ws.Cells.Item(1,$c).Text
    $headers += $val
}
$results = @()
for ($r = 2; $r -le $rows; $r++){
    $cell = $ws.Cells.Item($r,12).Text  # column L
    if ($cell -ne $null -and $cell.Trim().ToLower() -eq 'neu'){
        $obj = @{}
        for ($c=1; $c -le $cols; $c++){
            $h = if ($headers[$c-1]) { $headers[$c-1] } else { "Column$c" }
            $obj[$h] = $ws.Cells.Item($r,$c).Text
        }
        $results += (New-Object PSObject -Property $obj)
    }
}
# output count and write to CSV
Write-Host "Found $($results.Count) rows with 'neu' in column L." 
$results | Export-Csv -Path "src\new_attrs_neu.csv" -NoTypeInformation -Encoding UTF8
$wb.Close($false)
$xl.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($xl) | Out-Null
Write-Host "Wrote src\new_attrs_neu.csv"
