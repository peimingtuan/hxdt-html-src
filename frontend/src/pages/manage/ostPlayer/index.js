import "babel-polyfill"
require('./css/index.less')
import $ from 'jquery'
import getApiUrl from './js/getApiUrl'
import {Toast} from '../../../component/LikeAlert/index'
import FoundationTools from "../../../js/functionAjax"
import UTFTranslate from './js/utftoGbk'
import Loading from '../../../component/loading'
var loading = new Loading()//加载loading
var playOcx=null;
var isshow=FoundationTools.getUrlParam('btn');
if(isshow==2){
    player2(FoundationTools.getUrlParam('videoFileStage'),FoundationTools.getUrlParam('caseInfoId'),FoundationTools.getUrlParam('choicecourtTime'))
    $(".player_box2 .top").addClass('fill');
    $('.bottom').addClass("none");
}else if(isshow==1){
    player(FoundationTools.getUrlParam('trialPlanId'))
}

//视频直播播放
function player(trialPlanId){
    var cmsuserinfo=JSON.parse(FoundationTools.getCookie('cmsuserinfo'));
    var param={
        method:'',
        requestSource:'',
        data:{
            trialPlanId,
            userId:cmsuserinfo.userid,
            courtCode:sessionStorage.getItem('peilawcourtcode')
        }
    }
    $.ajax({
        type: "post",
        data: param,
        url: getApiUrl('/courtRoomManage/getLivePlayInfos'),
        beforeSend: function () {

        },
        success: function (data) {
            loading.destroy();
            $('.bottom').removeClass("none");
            if (data.code === 200) {
                console.log(UTFTranslate.ReChange(data.data.playXml))
                initPlayer(data.data.playXml)
            }else {
                new Toast(data.message);
            }
        },
        err:function(err){
            loading.destroy()
            new Toast('连接服务器失败，请稍后再试');
        }
    });
}

//视频点播播放
function player2(videoFileStage,caseInfoId,courtTime){
    var cmsuserinfo=JSON.parse(FoundationTools.getCookie('cmsuserinfo'));
    var param={
        method:'',
        requestSource:'',
        data:{
            videoFileStage,
            caseInfoId,
            courtTime,
            userId:cmsuserinfo.userid,
            courtCode:sessionStorage.getItem('peilawcourtcode')
        }
    }
    $.ajax({
        type: "post",
        data: param,
        url: getApiUrl('/videoManager/getvideoXmlByCaseTrial'),
        beforeSend: function () {

        },
        success: function (data) {
            loading.destroy()
            if (data.code === 200) {
                console.log(UTFTranslate.ReChange(data.data))
                initPlayer(data.data)
            }else {
                new Toast(data.message);
            }
        },
        err:function(err){
            loading.destroy()
            new Toast('连接服务器失败，请稍后再试');
        }
    });
}

function initPlayer(playUrls){
    try{
        playOcx = document.getElementById('PBMOCX');
        playOcx.ChnsysPBM_Start(playUrls);
    }catch(e){
        $(".player_box2").addClass("none");
        $(".download").removeClass("none");
    }
}



//播放器下载
$(".downLoad").on("click", function () {
    var loading=new Loading();
    let cmsuserinfo=JSON.parse(FoundationTools.getCookie('cmsuserinfo'));
    let param={
        method:'',
        requestSource:'',
        data:{
            userId:cmsuserinfo.userid,
            courtCode:sessionStorage.getItem('peilawcourtcode')
        }
    }
    $.ajax({
        type: "post",
        data: param,
        url: getApiUrl('/softwareVersionManage/getPlayerAddress'),
        beforeSend: function () {

        },
        success: function (data) {
            loading.destroy()
            if (data.code === 200) {
                window.open(data.data.url)
            }else {
                new Toast(data.message);
            }
        },
        err:function(err){
            loading.destroy()
            new Toast('连接服务器失败，请稍后再试');
        }
    });
});

//关闭页面
window.onbeforeunload=function(){
    console.log('关闭页面')
    if(playOcx){
        playOcx.ChnsysPBM_Stop();
        playOcx = null;
    }
}
