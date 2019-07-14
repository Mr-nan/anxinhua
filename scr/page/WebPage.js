import React,{Component} from 'react'
import {StyleSheet,View,DeviceEventEmitter} from 'react-native'
import { WebView } from 'react-native-webview';
import {SafeAreaView} from 'react-navigation';
import {getTitlePixel,NavigationHeadView,getData} from '../communal';
import {Lottie} from '../communal'

class WebPage extends Component {
    
    constructor(props){
        super(props);
        this.state={
            request:{},
            phoneNumber:''
        }
    }
    componentDidMount(){

        getData('loginKey').then(data=>{
           this.setState({
               phoneNumber:data
           })
       });
       
       this.loginAction = DeviceEventEmitter.addListener('loginAction', (msg) => {
           this.setState({
               phoneNumber:msg
           })
       });
   }

   componentWillUnmount(){
       this.loginAction && this.loginAction.remove();

   }
   render(){
       const webURL = this.props.navigation.state.params.webURL;
        return(
        <View style={styles.container}>
            <NavigationHeadView title={this.state.request.title} backClick={()=>{
                console.log('------------',this.state.request);
                if(!this.state.request.canGoBack){
                    this.props.navigation.goBack();
                }else{
                    this.web.goBack();
                }
            }}/>
            <SafeAreaView style={[{
                    backgroundColor: 'white', flex: 1},{marginTop:getTitlePixel(64)}]}
                 forceInset={{top:'never', bottom: 'never'}}>
                 <WebView ref={(ref)=>{this.web=ref}} source = { {uri:webURL} } 
                 onShouldStartLoadWithRequest={(request)=>{
                     this.setState({
                        request:request
                     })
                    return true;
                 }} 
                 onLoad={()=>{
                    this.lottie.show(true);
                 }}
                 onLoadEnd={()=>{
                    this.lottie.show(false);
                 }}
                 />
            </SafeAreaView>
            <Lottie ref={(ref) => this.lottie = ref}/>
        </View>
       
   )
}
}
export default WebPage;
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
   
})