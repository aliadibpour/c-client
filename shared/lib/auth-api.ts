export const loginApi = async (phoneNumber: string) => {
    try {
      const formattedPhone = phoneNumber.replace(/^0/, '+98');
      const response = await fetch('http://172.26.144.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'خطایی در ورود رخ داد');
      }
  
      return data;
    } catch (error:any) {
      throw new Error(error.message || 'ارتباط با سرور برقرار نشد.');
    }
};
  
export const verifyApi = async (code: string) => {
  try {
    const response = await fetch('http://172.26.144.1:3000/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطایی در ورود رخ داد');
    }

    return data;
  } catch (error:any) {
    throw new Error(error.message || 'ارتباط با سرور برقرار نشد.');
  }
};
