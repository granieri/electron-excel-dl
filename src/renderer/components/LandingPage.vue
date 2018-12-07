<template>
<div class="wrapper">
  <button @click="excelize()">make</button>
  <h2>processes</h2>
  <table>
    <thead>
      <tr>
        <td>Job</td>
        <td>Status</td>
        <td>Start time</td>
        <td>End time</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in process">
        <td :class="{ lag: p.LAGGING }"> {{ p.NAME }} </td>
        <td> {{ p.STATUS }} </td>
        <td> {{ p.START_TIME }} </td>
        <td> {{ p.END_TIME }}</td>
      </tr>
    </tbody>
  </table>

  <h2>metadata</h2>
  <table>
    <thead>
      <tr>
        <td>Job</td>
        <td>Status</td>
        <td>Start time</td>
        <td>End time</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in metadata">
        <td :class="{ lag: m.LAGGING }"> {{ m.NAME }} </td>
        <td> {{ m.STATUS }} </td>
        <td> {{ m.START_TIME }} </td>
        <td> {{ m.END_TIME }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import * as xl from '../excel'
import exceljs from 'exceljs'
import fs from 'fs'
import tempy from 'tempy'


export default {
  name: 'landing-page',
  data() {
    return {
      process: {
        '123': {
          'NAME': 'Sample',
          'STATUS': 'Running',
          'START_TIME': '2018-12-07 06:04:53',
          'END_TIME': '',
          'LAGGING': true
        },
        '456': {
          'NAME': 'Another sample',
          'STATUS': 'Running',
          'START_TIME': '2018-12-07 06:04:53',
          'END_TIME': '',
          'LAGGING': true
        },
      },
      metadata: {
        '123': {
          'NAME': 'Example',
          'STATUS': 'Running',
          'START_TIME': '2018-12-07 07:04:33',
          'END_TIME': '',
          'LAGGING': false
        },
        '456': {
          'NAME': 'Another Example',
          'STATUS': 'Completed',
          'START_TIME': '2018-12-05 07:05:00',
          'END_TIME': '2018-12-05 07:15:47',
          'LAGGING': true
        }
      },
      process_ids: ['123', '456'],
      metadata_ids: ['123', '456']
    }
  },
  methods: {
    excelize() {
      const remote = require('electron').remote
      const {dialog} = remote.require('electron')
      let now = new Date()

      let tasks = [
        {
          status: this.process,
          ids: this.process_ids,
          taskname: 'Process streaming'
        },
        {
          status: this.metadata,
          ids: this.metadata_ids,
          taskname: 'Metadata streaming'
        }
      ]

      let wb = xl.generate_workbook(tasks)
      let filename = 'report_' + now.getTime() + '.xlsx'
      let tmp_path = tempy.file({name: filename})
      let fs_stream = fs.createWriteStream(tmp_path)
      wb.xlsx.write(fs_stream)
      .then(function() {
        let win = remote.getCurrentWindow()
        let save_to = dialog.showSaveDialog(win, {defaultPath: filename})
        if(save_to){
          fs.createReadStream(tmp_path).pipe(fs.createWriteStream(save_to))
        }
        else {
          console.log('file save operation canceled')
        }
      })
    }
  }
}
</script>

<style>
thead {
  font-weight: bold;
}

td {
  padding: 5px;
}

.lag {
  color: red;
}
</style>
