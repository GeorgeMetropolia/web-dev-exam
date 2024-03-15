import ContactDetails from '../components/contactDetails';
import ContactForm from '../components/contactForm';
import ContactUpdateForm from '../components/contactUpdateForm';
import {useEffect, useState} from 'react';

const Home = () => {
  const [contactArray, setContactArray] = useState([]);
  useEffect(() => {
    const getContact = async () => {
      const response = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setContactArray([]);
        return;
      }
      setContactArray(data);
    };
    getContact();
  }, []);
  return (
    <div className="home">
      <div className="myservice">
        {contactArray.length === 0 && <h2>No Contacts Found</h2>}
        {contactArray.map((contact) => (
          <ContactDetails key={contact._id} contact={contact} />
        ))}
      </div >
      <ContactForm />
    </div>
  );
};
export default Home;
