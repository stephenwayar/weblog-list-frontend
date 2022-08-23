const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{color: 'green', padding: '20px', borderColor: 'green', border: '1px'}}>
      {message}
    </div>
  )
}

export default SuccessNotification