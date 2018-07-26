# UIRepository-React-Native
## LJAlertView
### 属性
| 属性  | 描述 |
|----|----:|
| type  | simple  confirm  默认 simple  |
| title  | simple 和  confirm 模式下 的标题  |
| content  | simple模式下展示的内容,confirm下不需要  |
| sureBtnTitle  | simple模式下的按钮标题  |
| confirmBtnOnpress  | 两种模式下的确认按钮  |
| closeBtnOnpress  | 两种模式下关闭按钮  |
| backActionHandler  | 安卓的返回按钮事件  |
| btnTitles  | comfirm模式下的按钮标题  |

### Usage
```javascript
import LJAlert from './Components/LJAlert'
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <LJAlert
          title={"语音验证码"}
          content={"我们将会给138****3212手机拨打语音，请 注意接听来电"}
          sureBtnTitle={"我知道了"}
          show={true}
          type={"confirm"}
          btnTitles={["取消","放弃修改"]}
          confirmBtnOnpress={()=>{
            console.warn("确认按钮点击");
            
          }} 
          closeBtnOnpress={()=>{
            console.warn("关闭按钮点击");
          }}/>
      </View>
    );
  }
}
```
