import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '~/components/contexts/UserContext';
import { useSignIn } from '~/components/contexts/UserContext';

export const SignInButton = () => {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  const { auth } = useUserContext();
  const { signIn } = useSignIn();

  const handleClick = () => {
    // @see https://firebase.google.com/docs/auth/web/google-signin
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        signIn(user);
        navigate(`/home`);
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full  bg-white border py-2 mt-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100 transition"
    >
      <FcGoogle className="w-4 h-4" />
      <span>Googleでサインイン</span>
    </button>
  );
};
