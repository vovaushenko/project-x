import './style.css';
import typescriptLogo from './typescript.svg';
import { Header, Counter, setupCounter } from 'ui';
import { IUser } from 'model';
import { Logger } from 'web-lib';

const user: IUser = {
	email: 'test@gmail.com',
	id: '123',
	name: 'John Doe',
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    ${Header({ title: 'Web' })}
    <div class="card">
      ${Counter()}
    </div>
    <button class="web-lib-test">Test Web Lib</button>

    ${user.email}
  </div>
`;

document
	.querySelector<HTMLButtonElement>('.web-lib-test')!
	.addEventListener('click', () => {
		Logger.log('Test Web Lib');
		Logger.alert('Test Web Lib');
	});

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
