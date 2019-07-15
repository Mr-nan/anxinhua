import React,{Component} from 'react'
import {StyleSheet,View,DeviceEventEmitter} from 'react-native'
import { WebView } from 'react-native-webview';
import {SafeAreaView} from 'react-navigation';
import {getTitlePixel,NavigationHeadView,getData,screenWidth, getPixel} from '../communal';
import {Lottie} from '../communal';
import *as api from '../netWork/api';

let url =  api.webHome;

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
                if(data){
                    url+="?&mobile="+data;
                }
                this.setState({
                   phoneNumber:data
               })
               
           });
           
           this.loginAction = DeviceEventEmitter.addListener('loginAction', (data) => {
            if(data){
                url+="?&mobile="+data;
            }else{
                url = api.webHome;
            }
            this.setState({
                   phoneNumber:data
               })

            // this.web.reload();

           });
       }
   
       componentWillUnmount(){
           this.loginAction && this.loginAction.remove();
   
       }
       render(){
            return(
            <View style={styles.container}>
               {
                   this.state.request.url!=url && 
                    <NavigationHeadView title={this.state.request.title} backClick={()=>{
                        this.web.goBack();
                    }}/>
                } 
                <SafeAreaView style={[{
                        backgroundColor: 'white', flex: 1},this.state.request.url!=url &&{marginTop:getTitlePixel(64)}]}
                     forceInset={{top: this.state.request.url!=url?'never':'always', bottom: 'never'}}>
                     <WebView ref={(ref)=>{this.web=ref}} source = { { uri:url}}
                     onShouldStartLoadWithRequest={(request)=>{
                         console.log('------------url',url);
                         console.log('------------this.state.phoneNumber',this.state.phoneNumber);
                         console.log('------------request.url',request.url);
                         if(!this.state.phoneNumber && request.url!=url){
                             console.log('------------Login',);
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