const verifyEmailTempalte = ({ name, url }) => {
  return `
        <div>
            <h1>Hi ${name}</h1>
            <p>Thanks for signing up. Please click the link below to verify your email.</p>
            <a href="${url} style="color:black;background:orange;margin-top:10px;padding:20px;display:block">Verify Email</a>
        </div>
    `;
};
export default verifyEmailTempalte;
