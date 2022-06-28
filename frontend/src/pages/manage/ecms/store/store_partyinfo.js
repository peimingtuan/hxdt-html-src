const module = {
    namespaced: true,
    state:{
        caseStandingList:[],//诉讼地位
        PartyTypeList:[],//当事人身份类型
        cityList:[],//国别和地区信息
        nationList:[],// 民族信息
        EducationInfosList:[],//文化教育
        IdentityTypeInfosList:[],//证件类型
        CriminalAbilityList:[],//刑事责任能力
        ActiveAbilityList:[],//行为能力
        PoliticalFaceList:[],//获取政治面貌信息
        MaritalStatusList:[],//婚姻
        unitTypeList:[],//单位类型
        unitStatusList:[],//单位状态
        certificateTypeList:[],//证照类型
    },
    mutations:{
        setcaseStandingList(state,data){
            state.caseStandingList=data;
        },
        setPartyTypeList(state,data){
            state.PartyTypeList=data;
        },
        setcityListr(state,data){
            state.cityList=data;
        },
        setnationList(state,data){
            state.nationList=data;
        },
        setEducationInfosList(state,data){
            state.EducationInfosList=data;
        },
        setIdentityTypeInfosList(state,data){
            state.IdentityTypeInfosList=data;
        },
        setCriminalAbilityList(state,data){
            state.CriminalAbilityList=data;
        },
        setActiveAbilityList(state,data){
            state.ActiveAbilityList=data;
        },
        setPoliticalFaceList(state,data){
            state.PoliticalFaceList=data;
        },
        setMaritalStatusList(state,data){
            state.MaritalStatusList=data;
        },
        setunitTypeList(state,data){
            state.unitTypeList=data;
        },
        setunitStatusList(state,data){
            state.unitStatusList=data;
        },
        setcertificateTypeList(state,data){
            state.certificateTypeList=data;
        },
    },
    actions:{
        //当事人类型信息
        getPartyTypeInfos({state,commit},_this) {
           return _this.$http.post('/baseInfo/getPartyTypeInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setPartyTypeList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
                //_this.$msge('服务器异常，请稍后重试');
            })
        },
        //获取国别和地区信息
        getCountryAreaInfos({state,commit},_this) {
           return _this.$http.post('/baseInfo/getCountryAreaInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setcityListr',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
                //_this.$msge('服务器异常，请稍后重试');
            })
        },
        //民族信息
        getNationInfos({state,commit},_this) {
           return _this.$http.post('/baseInfo/getNationInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setnationList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
                //_this.$msge('服务器异常，请稍后重试');
            })
        },
        //文化程度
        getEducationInfos({state,commit},_this) {
           return  _this.$http.post('/baseInfo/getEducationInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setEducationInfosList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
                // _this.$msge('服务器异常，请稍后重试');
            })
        },
        //证件类型
        getIdentityTypeInfos({state,commit},_this) {
            return _this.$http.post('/baseInfo/getIdentityTypeInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setIdentityTypeInfosList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
                _this=null;
            }).catch(err => {
                _this=null;
                //_this.$msge('服务器异常，请稍后重试');
            })
        },
        //刑事责任能力
        getCriminalAbilityInfos({state,commit},_this){
           return _this.$http.post('/baseInfo/getCriminalAbilityInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setCriminalAbilityList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
            })
        },
        //行为能力状况
        getActiveAbilityInfos({state,commit},_this) {
          return  _this.$http.post('/baseInfo/getActiveAbilityInfos',{

            }).then(data => {
                if (data.code === 200) {
                    commit('setActiveAbilityList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
              _this=null;
            }).catch(err => {
              _this=null;
            })
        },
        //政治面貌
        getPoliticalFaceInfos({state,commit},_this) {
           return _this.$http.post('/baseInfo/getPoliticalFaceInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setPoliticalFaceList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
            })
        },
        //婚姻状况
        getMaritalStatusInfos({state,commit},_this) {
           return _this.$http.post('/baseInfo/getMaritalStatusInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setMaritalStatusList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
               _this=null;
            }).catch(err => {
               _this=null;
            })
        },
        //单位类型信息
        getUnitTypeInfos({state,commit},_this) {
            return _this.$http.post('/baseInfo/getUnitTypeInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setunitTypeList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
                _this=null;
            }).catch(err => {
                _this=null;
            })
        },
        //单位状态信息
        getUnitStatusInfos({state,commit},_this) {
            return _this.$http.post('/baseInfo/getUnitStatusInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setunitStatusList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
                _this=null;
            }).catch(err => {
                _this=null;
            })
        },
        //证照类型
        getCertificateTypeInfos({state,commit},_this) {
            return  _this.$http.post('/baseInfo/getCertificateTypeInfos',{}).then(data => {
                if (data.code === 200) {
                    commit('setcertificateTypeList',data.data);
                } else {
                    _this.$msgw(data.message);
                }
                _this=null;
            }).catch(err => {
                _this=null;
            })
        },
    }
}
export default module;