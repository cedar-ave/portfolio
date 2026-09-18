import Data from '@site/data/Contact.json';
function Contact_list({ title, content }) {
  return (
    <div>
      <h3 className="mt-3">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default function List_Contacts() {
  return (
    <div>
      {Data.contact_info.map((props, idx) => (
        <Contact_list key={idx} {...props} />
      ))}
    </div>
  );
}
