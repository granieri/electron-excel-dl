import exceljs from 'exceljs'

export function generate_workbook() {
  const now = new Date();
  const wb = new exceljs.Workbook()

  wb.creator = 'Exceltron app'
  wb.lastModifiedBy = 'Exceltron'
  wb.created = now
  wb.modified = now

  // process STREAMING
  const process_streaming_ws = wb.addWorksheet('Process streaming', {})

  process_streaming_ws.columns = [
    { header: 'Job', key: 'table', width: 35 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Runtime', key: 'runtime', width: 12 },
    { header: 'High runtime flag', key: 'hrf', width: 15 },
    { header: 'Lagging flag', key: 'lf', width: 15 }
  ];

  const process_streaming_table_col = process_streaming_ws.getColumn('job')
  const process_streaming_status_col = process_streaming_ws.getColumn('status')
  const process_streaming_runtime_col = process_streaming_ws.getColumn('runtime')
  const process_streaming_lf_col = process_streaming_ws.getColumn('lf')
  const process_streaming_hrf_col = process_streaming_ws.getColumn('hrf')

  process_streaming_table_col.header = 'Job'
  process_streaming_status_col.header = 'Status'
  process_streaming_runtime_col.header = 'Runtime (min)'
  process_streaming_lf_col.header = 'High runtime flag'
  process_streaming_hrf_col.header = 'Lagging flag'

  for(let job in process_ids){
    let name = process[job].NAME
    let status = process[job].STATUS
    let start_ts = new Date(process[job].START_TIME)
    let end_ts = new Date(process[job].END_TIME + 'Z')
    let runtime = Boolean(end_ts) ?  end_ts - start_ts:now.getTime() - start_ts
    let hrf = runtime > 15 ? 1:0
    let lf = process[job].LAGGING ? 1:0
    process_streaming_ws.addRow([name, status, runtime, hrf, lf]);
  }

  // metadata STREAMING
  const metadata_streaming_ws = wb.addWorksheet('metadata streaming', {})

  metadata_streaming_ws.columns = [
    { header: 'Table', key: 'table', width: 35 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Runtime', key: 'runtime', width: 12 },
    { header: 'Slow flag', key: 'hrf', width: 15 },
    { header: 'Lagging flag', key: 'lf', width: 15 }
  ];

  const metadata_streaming_table_col = metadata_streaming_ws.getColumn('job')
  const metadata_streaming_status_col = metadata_streaming_ws.getColumn('status')
  const metadata_streaming_runtime_col = metadata_streaming_ws.getColumn('runtime')
  const metadata_streaming_lf_col = metadata_streaming_ws.getColumn('hrf')
  const metadata_streaming_hrf_col = metadata_streaming_ws.getColumn('lf')

  metadata_streaming_table_col.header = 'Job'
  metadata_streaming_status_col.header = 'Status'
  metadata_streaming_runtime_col.header = 'Runtime (min)'
  metadata_streaming_lf_col.header = 'High runtime flag'
  metadata_streaming_hrf_col.header = 'Lagging flag'

  for(let job in metadata_ids){
    let name = metadata[job].NAME
    let status = metadata[job].STATUS
    let start_ts = new Date(metadata[job].START_TIME + 'Z')
    let end_ts = new Date(metadata[job].END_TIME + 'Z')
    let runtime = Boolean(end_ts) ?  end_ts - start_ts:now.getTime() - start_ts
    let hrf = runtime > 15 ? 1:0
    let lf = metadata[job].LAGGING ? 1:0
    metadata_streaming_ws.addRow([name, status, runtime, hrf, lf]);
  }
}
