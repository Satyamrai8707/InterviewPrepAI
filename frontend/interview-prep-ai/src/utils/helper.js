export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  


export const getInitials = (title) => {  
  if (!title) return "";
  const words = title.split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (
    words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
  );
}
