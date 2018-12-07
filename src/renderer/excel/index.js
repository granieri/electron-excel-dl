import exceljs from 'exceljs'

export function generate_workbook(process, process_ids, metadata, metadata_ids) {
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

  const process_streaming_table_col = process_streaming_ws.getColumn('A')
  const process_streaming_status_col = process_streaming_ws.getColumn('B')
  const process_streaming_runtime_col = process_streaming_ws.getColumn('C')
  const process_streaming_lf_col = process_streaming_ws.getColumn('D')
  const process_streaming_hrf_col = process_streaming_ws.getColumn('E')

  process_streaming_table_col.header = 'Job'
  process_streaming_status_col.header = 'Status'
  process_streaming_runtime_col.header = 'Runtime (min)'
  process_streaming_lf_col.header = 'High runtime flag'
  process_streaming_hrf_col.header = 'Lagging flag'

  for(let job in process_ids){
    let id = process_ids[job]
    let name = process[id].NAME
    let status = process[id].STATUS
    let start_ts = new Date(process[id].START_TIME)
    let end_ts = new Date(process[id].END_TIME + 'Z')
    let runtime = Boolean(process[id].END_TIME) ?  end_ts.getTime() - start_ts:now.getTime() - start_ts.getTime()
    runtime /= 60
    let hrf = runtime > 15 ? 1:0
    let lf = process[id].LAGGING ? 1:0
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

  const metadata_streaming_table_col = metadata_streaming_ws.getColumn('A')
  const metadata_streaming_status_col = metadata_streaming_ws.getColumn('B')
  const metadata_streaming_runtime_col = metadata_streaming_ws.getColumn('C')
  const metadata_streaming_lf_col = metadata_streaming_ws.getColumn('D')
  const metadata_streaming_hrf_col = metadata_streaming_ws.getColumn('E')

  metadata_streaming_table_col.header = 'Job'
  metadata_streaming_status_col.header = 'Status'
  metadata_streaming_runtime_col.header = 'Runtime (min)'
  metadata_streaming_lf_col.header = 'High runtime flag'
  metadata_streaming_hrf_col.header = 'Lagging flag'

  for(let job in metadata_ids){
    let id = metadata_ids[job]
    let name = metadata[id].NAME
    let status = metadata[id].STATUS
    let start_ts = new Date(metadata[id].START_TIME + 'Z')
    let end_ts = new Date(metadata[id].END_TIME + 'Z')
    let runtime = Boolean(metadata[id].END_TIME) ?  end_ts.getTime() - start_ts:now.getTime() - start_ts.getTime()
    runtime /= 60
    let hrf = runtime > 15 ? 1:0
    let lf = metadata[id].LAGGING ? 1:0
    metadata_streaming_ws.addRow([name, status, runtime, hrf, lf]);
  }

  return wb
}
