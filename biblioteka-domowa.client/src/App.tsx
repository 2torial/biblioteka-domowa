import { useNavigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const navigate = useNavigate();
    const [forecasts, setForecasts] = useState<Forecast[]>();

    const collectData = (...ids: string[]): FormData => {
        let data = undefined;
        for (const id of ids) {
            const form: HTMLFormElement | null = document.querySelector(`form#${id}`);
            if (form !== null) {
                if (data === undefined) data = new FormData(form);
                else for (const [name, value] of new FormData(form).entries()) {
                    data.append(name, value);
                }
            }
        }
        return data !== undefined ? data : new FormData();
    };
    enum FormID {
        Filters = "filters",
        Settings = "settings",
        SignIn = "sign-in",
        SignUp = "sign-up",
        Summary = "summary",
    }

    const signIn = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const data = collectData(FormID.SignIn);
        const response = await fetch('/api/account/login', {
            method: "post",
            body: data
        });
        if (response.ok) {
            //updateUserIdentity();
            navigate("/");
        }
        alert(await response.text());
    };

    useEffect(() => {
        populateWeatherData();
    }, []);

    const weatherContents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    const formProps = {
        id: FormID.SignIn,
        onSubmit: signIn,
    };

    const page = <div>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {weatherContents}
        <form {...formProps} >
            <h2>"Sign in"</h2>

            <label htmlFor="username">Username</label>
            <input id="username" type="text" name="UserName" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="PassWord" />

            <input type="submit" value="Log in" />
        </form>
    </div>;

    return <>
        {useRoutes([
            { path: "/", element: page },
            { path: "/weather", element: page },
        ])}
    </>;

    async function populateWeatherData() {
        const response = await fetch('/api/weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;