export default (path) => {
  const regexUuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const pathArr = path.split('/').reverse()
  const pathArrUppercase = pathArr.map((string) =>
    string.includes('-') ? 
      (string.match(regexUuid) ? '' : string
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
      )
      : string.charAt(0).toUpperCase() + string.slice(1)
  )

  return pathArrUppercase.filter(function(e){return e}).join(' | ')
}
