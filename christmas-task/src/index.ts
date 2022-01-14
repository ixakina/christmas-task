import './styles/scss/clear-style.css';
import './styles/scss/main.scss';
import data from './app-1/data';
import App from './app-1/app';

const app = new App(data);
app.init();

console.log(`
Доброго времени суток моим проверяющим)! Очень Вас прошу оставлять свои контакты. Спасибо! С наступающим Вас!
Обратите внимание: чтобы увидеть действие кнопки "сбросить настройки", надо перезагрузить страницу.
Самооценка 195/220 баллов:
1. Вёрстка страниц приложения и навигация между ними +30;
2. Меню с настройками +50;
3. Гирлянда +35/40: внешний вид гирлянды отличается от демо в худшую сторону.
4. Игрушки в избранном +80;
`);