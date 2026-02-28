'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorM = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button
        type="button"
        onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default ErrorM;
