<template>
<div class="wrapper">
  <button>make</button>
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

export default {
  name: 'landing-page',
  data() {
    return {
      process: {
        '123': {
          'NAME': 'Sample',
          'STATUS': 'Running',
          'START_TIME': '2018-12-05 06:04:53',
          'END_TIME': '',
          'LAGGING': true
        },
        '456': {
          'NAME': 'Another sample',
          'STATUS': 'Running',
          'START_TIME': '2018-12-05 06:04:53',
          'END_TIME': '',
          'LAGGING': true
        },
      },
      metadata: {
        '123': {
          'NAME': 'Example',
          'STATUS': 'Running',
          'START_TIME': '2018-12-05 07:04:33',
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
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

td {
  padding: 5px;
}

.lag {
  color: red;
}
</style>
