import { Markup } from 'telegraf';

export function mainButtons() {
    return Markup.keyboard(
        [
            Markup.button.callback('Bombardier ', 'Bombardier'),
        ],
        {
            columns: 1
        }
    );
}