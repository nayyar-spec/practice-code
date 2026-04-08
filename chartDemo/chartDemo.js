import { LightningElement, wire, track } from 'lwc';
// Requirement: Static Resource se library aur loadScript tool mangwana
import chartjs from '@salesforce/resourceUrl[chartjs]';
import { loadScript } from 'lightning/platformResourceLoader';
import getAccountIndustryStats from '@salesforce/apex/ChartController.getAccountIndustryStats';

export default class ChartDemo extends LightningElement {
    @track isChartJsInitialized = false;
    chart;

    // Working: Jaise hi component load ho, library ko load karo
    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        // Requirement: Script load hone ke baad hi chart banana shuru karein
        loadScript(this, chartjs)
            .then(() => {
                console.log('Chart.js loaded');
                this.loadDataAndRender();
            })
            .catch(error => {
                console.error('Error loading Chart.js', error);
            });
    }

    // Working: Apex se data lekar Chart format mein badalna
    loadDataAndRender() {
        getAccountIndustryStats()
            .then(result => {
                // Result format: { 'Education': 5, 'Energy': 10 }
                const labels = Object.keys(result);
                const data = Object.values(result);

                this.renderChart(labels, data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    renderChart(labels, data) {
        // Requirement: HTML ke canvas element ko pakadna
        const canvas = document.createElement('canvas');
        this.template.querySelector('div.chart-container').appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // Working: Chart.js ka standard configuration
        this.chart = new window.Chart(ctx, {
            type: 'pie', // Aap yahan 'bar', 'line', 'doughnut' bhi likh sakte hain
            data: {
                labels: labels,
                datasets: [{
                    label: 'Industry Count',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}