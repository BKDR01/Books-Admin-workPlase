import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { getStatistic } from '../../api/auth';

const ChartCircle = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [stats, setStats] = useState({ likes: 0, books: 0, news: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStatistic();
                const result = res.data;

                setStats({
                    likes: result.likes || 0,
                    books: result.books || 0,
                    news: result.news || 0,
                    users: result.users || 0,
                });

                const data = {
                    labels: ['Likes', 'Books', 'News', 'Users'],
                    datasets: [
                        {
                            data: [
                                result.likes || 0,
                                result.books || 0,
                                result.news || 0,
                                result.users || 0,
                            ],
                            backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', "#FF9F40"],
                        }
                    ]
                };

                const options = { cutout: '60%' };

                setChartData(data);
                setChartOptions(options);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-1/2 md:w-30rem " />
        </>
    )
}

export default ChartCircle