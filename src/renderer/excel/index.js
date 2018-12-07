import exceljs from 'exceljs'

export function generate_workbook(tasks) {
  const now = new Date();
  const wb = new exceljs.Workbook()

  wb.creator = 'Exceltron app'
  wb.lastModifiedBy = 'Exceltron app'
  wb.created = now
  wb.modified = now

  for(let i in tasks){
    const task = tasks[i]
    const ws = wb.addWorksheet(task.taskname, {})
    const header_font = { bold: true }
    ws.columns = [
      { header: 'Job', key: 'table', width: 35 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Runtime', key: 'runtime', width: 12 },
      { header: 'High runtime flag', key: 'hrf', width: 16 },
      { header: 'Lagging flag', key: 'lf', width: 15 }
    ];

    ws.getRow(1).font = header_font

    for(let job in task.ids){
      let id = task.ids[job]
      let name = task.status[id].NAME
      let status = task.status[id].STATUS
      let start_ts = new Date(task.status[id].START_TIME + 'Z')
      let end_ts = new Date(task.status[id].END_TIME + 'Z')
      let runtime = Boolean(task.status[id].END_TIME) ?  end_ts.getTime() - start_ts:now.getTime() - start_ts.getTime()
      runtime = Math.round(runtime/60000)
      let hrf = runtime > 15 ? 1:0
      let lf = task.status[id].LAGGING ? 1:0
      let runtimes = Math.floor(runtime/60) + 'h ' + runtime % 60 + 'm'
      ws.addRow([name, status, runtimes, hrf, lf]);
    }
  }
  return wb
}
