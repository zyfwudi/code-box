import { Button, Message } from 'shineout'
import useStyle from '../style'

const icon = (
  <svg width="155" height="28" viewBox="0 0 155 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2588 0.475038C18.2588 0.294961 18.0379 0.195354 17.8984 0.309218C16.8735 1.14575 13.7216 3.43607 9.20833 4.11595C8.36218 4.24341 7.5602 4.43071 6.80856 4.65667C2.03502 6.09173 -0.000917435 11.2002 -0.000917435 16.1847V16.1847C-0.000917435 16.1847 3.8098 12.7664 9.20833 11.9293C10.1463 11.7838 11.0315 11.5647 11.8541 11.3018C16.3028 9.88009 18.2588 5.14542 18.2588 0.475038V0.475038Z" fill="#197AFA"></path><path d="M18.2588 11.2709C18.2588 11.0909 18.0379 10.9913 17.8984 11.1051C16.8735 11.9416 13.7216 14.232 9.20833 14.9118C8.36218 15.0393 7.56021 15.2266 6.80857 15.4526C2.03502 16.8876 -0.000915051 21.9961 -0.000915051 26.9806V26.9806C-0.000915051 26.9806 3.80981 23.5623 9.20833 22.7252C10.1463 22.5797 11.0315 22.3606 11.8541 22.0977C16.3028 20.676 18.2588 15.9413 18.2588 11.2709V11.2709Z" fill="#FF8259"></path></svg>
)

export interface IHeader {
  title?: React.ReactNode
  extraFunctions?: React.ReactNode
}

const Header = (props: IHeader) => {
  const { title, extraFunctions } = props

  const styles = useStyle()

  const copy = () => {
    const url = window.location.href
    if (!url) return

    navigator?.clipboard?.writeText(url)

    Message.success('Copied to clipboard')
  }

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        {
          title || (
            <>
              <div className={styles.icon}>{icon}</div>
              Shineout Playground
            </>
          )
        }
      </div>
      <div className={styles.func}>
        {extraFunctions}
        <Button size='small' type='success' onClick={copy}>Share</Button>
      </div>
    </div>
  )
}

export default Header