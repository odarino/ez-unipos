const config = {
    UNIPOS_URL: 'https://unipos.me/q/jsonrpc',
    UNIPOST_SENDPOINT_URL: 'https://unipos.me/c/jsonrpc',
    SEND_MESSAGE: 'Unipos.SendCard',
    CORE_VALUES: [
      '#1.AppreciateTeamwork',
      '#2.ThinkOutsideTheBox',
      '#3.HaveTheGutsToChallenge',
      '#4.ThinkPositive',
      '#5.SpeedUp',
      '#6.BeProfessional',
      '#7.FocusOnThePoint'
    ]
}
module.exports = config 
  
  // {"jsonrpc":"2.0","method":"Unipos.SendCard","params":{"from_member_id":"5606eff1-f026-459b-a0e7-ba50812ea174"
  // ,"to_member_id":"8162cbb9-e04a-480f-89a1-827cf8853dab","point":10,"message":"#1.AppreciateTeamwork thank
  //  you"},"id":"Unipos.SendCard"}
  
  
    // nightmare
    // .goto('https://unipos.me/login')
    // .type('.login_input[type=email]', 'vu.minh.phung@framgia.com')
    // .type('.login_input[type=password]', 'Namcobandai1')
    // .click('.login_btn')
    // .evaluate(() => {
    //   return localStorage.getItem("authnToken")
    // })
    // .end(() => {
    //   nightmare = null;
    // })
    // .then((token) => {
    //   debugger
    //   res.render('index', { title: token });
    // })
    // .catch(error => {
    //   console.error('Search failed:', error)
    // })
  
    // var curl = new Curl(),
    // url = 'https://unipos.me/q/jsonrpc',
    // certfile = path.join(__dirname, 'cacert.pem'),
    // data = {
    //   //Data to send, inputName : value
    //   'id]': 'Unipos.GetProfile',
    //   'jsonrpc': '2.0',
    //   'method': 'Unipos.GetProfile',
    //   'params': [],
    // };