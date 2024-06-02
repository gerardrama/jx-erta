const getDateData = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const maxDate = new Date(year, month + 1, 0).getDate();
 
  return {maxDate, month, year};
}

const generateData = () => {
  const data = [];

  for (let i = 1; i <= getDateData().maxDate; i++) {
    data.push({
      date: `${i}/${getDateData().month + 1}`,
      tasks: Math.floor(Math.random() * 10)
    });
  }

  return data;
}

export const config = {
    data: generateData(),
    xField: 'date',
    yField: 'tasks',
    point: {
      shapeField: 'circle',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: true,
      },
    },
    style: {
      lineWidth: 2,
    },
};