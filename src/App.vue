<template>
  <div>
    <h1>Health Register</h1>
    <ol>
      <li v-for="person in people" :key="person.id">
        Name: {{ person.name }}<br>
        Age: {{ person.age }} <br>
        Blood Group: {{ person.bloodGroup }}
      </li>
    </ol>

    <div id="chart-container"></div>
  </div>
</template>

<script>

import db from './firebase/init.js'
import { query, collection, getDocs } from 'firebase/firestore'
import Highcharts from 'highcharts';

export default {
  mounted() {
    const cachedData = localStorage.getItem('peopleData');
    if (cachedData) {
      
      this.people = JSON.parse(cachedData);
      this.renderChart(this.people);
    } else {
      this.getPeople();
    }
  },

  data() {
    return {
      people: []
    };
  },

  methods: {
    async getPeople() {
      const querySnap = await getDocs(query(collection(db, 'people')));
      querySnap.forEach((doc) => {
        this.people.push(doc.data());
      });

      this.storeDataInLocalStorage(this.people);

      
      this.renderChart(this.people);
    },

    storeDataInLocalStorage(data) {
      localStorage.setItem('peopleData', JSON.stringify(data));
    },

    renderChart() {
      Highcharts.chart('chart-container', {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Population by Blood Group and Age Range',
          align: 'center',
        },
        xAxis: {
          categories: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
          gridLineWidth: 1,
          lineWidth: 0,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of People',
          },
          labels: {
            overflow: 'justify',
          },
          gridLineWidth: 0,
        },
        plotOptions: {
          bar: {
            borderRadius: '50%',
            groupPadding: 0.1,
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Age < 30',
            data: [0, 3, 2, 1, 1, 0, 1, 0],
          },
          {
            name: '30-39',
            data: [1, 1, 0, 1, 1, 2, 1, 0], 
          },
          {
            name: '40-49',
            data: [2, 0, 1, 1, 0, 0, 0, 1], 
          },
        ],
      });
    },
  },
};
</script>

<style>
/* Your component styles */
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 2px;
}
ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 3fr));
  height: 20%;
  width: 95%;
  gap: 0;
}
li {
  display: block;
  font-size: 12px;
  width: 60%;
  justify-content: left;
  background: rgba(25, 170, 51, 0.2);
  padding: 7px;
  margin-top: 2px;
  border-radius: 4px;
  text-decoration: none;
}

</style>
