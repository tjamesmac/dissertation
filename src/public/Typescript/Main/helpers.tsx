export const submission = async (event: React.FormEvent) => {
  event.preventDefault();

  const textAreaValue: string = (document.getElementById('textarea') as HTMLTextAreaElement).value;

  const bodyText: object = {value: textAreaValue};

  try {
    const URL = 'http://localhost:3000/';
    const data = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyText),
    });
    const response = await data;
    if (response.status === 200) {
      const responseJson = await response.json();
      console.log(responseJson, 'response');
    }
  } catch (error) {
    console.error('uh oh error', error);
  }
};
