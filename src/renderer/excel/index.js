import exceljs from 'exceljs'

export function generate_workbook(tasks) {
  const now = new Date();
  const wb = new exceljs.Workbook()

  wb.creator = 'Exceltron app'
  wb.lastModifiedBy = 'Exceltron'
  wb.created = now
  wb.modified = now

  for(let i in tasks){
    const task = tasks[i]
    const ws = wb.addWorksheet(task.taskname, {})
    ws.columns = [
      { header: 'Job', key: 'table', width: 35 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Runtime', key: 'runtime', width: 12 },
      { header: 'High runtime flag', key: 'hrf', width: 15 },
      { header: 'Lagging flag', key: 'lf', width: 15 }
    ];

    const table_col = ws.getColumn('A')
    const status_col = ws.getColumn('B')
    const runtime_col = ws.getColumn('C')
    const lf_col = ws.getColumn('D')
    const hrf_col = ws.getColumn('E')

    table_col.header = 'Job'
    status_col.header = 'Status'
    runtime_col.header = 'Runtime (min)'
    lf_col.header = 'High runtime flag'
    hrf_col.header = 'Lagging flag'

    for(let job in task.ids){
      let id = task.ids[job]
      let name = task.status[id].NAME
      let status = task.status[id].STATUS
      let start_ts = new Date(task.status[id].START_TIME)
      let end_ts = new Date(task.status[id].END_TIME + 'Z')
      let runtime = Boolean(task.status[id].END_TIME) ?  end_ts.getTime() - start_ts:now.getTime() - start_ts.getTime()
      runtime /= 60
      let hrf = runtime > 15 ? 1:0
      let lf = task.status[id].LAGGING ? 1:0
      ws.addRow([name, status, runtime, hrf, lf]);
    }
  }
  return wb
}
