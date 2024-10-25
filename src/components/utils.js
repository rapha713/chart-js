// src/utils.js

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    blue: 'rgb(54, 162, 235)',
    yellow: 'rgb(255, 205, 86)',
  };
  
  function months(config) {
    const count = config.count || 12;
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return monthNames.slice(0, count);
  }
  
  function numbers(config) {
    const { min, max, count } = config;
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return values;
  }
  
  function transparentize(color, opacity) {
    const alpha = 1 - opacity;
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }
  
  export default {
    CHART_COLORS,
    months,
    numbers,
    transparentize
  };
  