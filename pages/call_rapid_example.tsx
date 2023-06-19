// import styles from '../styles/Home.module.css';
export default function Home() {
    const callAPI = async () => {
        try {
            const res = await fetch(
              `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random`,
              {
                  method: 'GET',
                  headers: {
                    'X-RapidAPI-Key': '9cfc2ab3f3mshca598d402899cebp10a845jsn569caa243a47',
                    'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
                  },
              }
          );
            const data = await res.json();
            console.log(data);
            console.log(data['value']);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <main>
                <button onClick={callAPI}>Make API call</button>
            </main>
        </div>
    );
}