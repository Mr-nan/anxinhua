import React,{Component} from 'react'
import {StyleSheet,View,DeviceEventEmitter} from 'react-native'
import { WebView } from 'react-native-webview';
import {SafeAreaView} from 'react-navigation';
import {getTitlePixel,NavigationHeadView,getData,screenWidth, getPixel} from '../communal';
import {Lottie} from '../communal'


class HomePage extends Component {
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
            return(
            <View style={styles.container}>
               {
                   this.state.request.navigationType=='click' && 
                    <NavigationHeadView title={this.state.request.title} backClick={()=>{
                        this.web.goBack();
                    }}/>
                } 
                <SafeAreaView style={[{
                        backgroundColor: 'white', flex: 1},this.state.request.navigationType=='click' &&{marginTop:getTitlePixel(64)}]}
                     forceInset={{top: this.state.request.navigationType=='click'?'never':'always', bottom: 'never'}}>
                     <WebView ref={(ref)=>{this.web=ref}} source = { { uri:'http://39.106.116.0/?tab=1'} } 
                     onShouldStartLoadWithRequest={(request)=>{
                         console.log('------------',request);
                         if(!this.state.phoneNumber && request.navigationType=='click'){
                            this.props.navigation.push('Login');
                            return false;
                         }
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
export default HomePage;
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'#f5f5f5',
    },

})