const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{color: 'red', padding: '20px', borderColor: 'red', border: '1px'}}>
      {message}
    </div>
  )
}

export default ErrorNotification