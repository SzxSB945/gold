var vm;

$(function () {

    vm = avalon.define({
        $id: "app",

        userid: "",
        password: "",
        logining:false,

        get_userData: function () {
            console.log(vm.userid);
            console.log(vm.password);
        },

        login: function () {
            
            if (vm.logining) {
                $.alert("登录请求正在进行中,请稍后再试...");
                return
            }
            var user = vm.userid;
            var pass = vm.password;
            if (user == '' || pass == '') {
                $.alert("账号密码不能为空");
                return
            }

            var postPass = "";
            postPass = SALT.charAt(2) + SALT.charAt(0) + pass + SALT.charAt(1) + SALT.charAt(9);
            postPass = CryptoJS.MD5(postPass)
            
            vm.logining = true
            
            $.get_data("get", "addrqry/login", { appName: 'platform', deviceType: 'PC', deviceId: '', username: user, password: postPass }, function (data) {

                vm.loginSuccess(data.data.sessionId);
                vm.logining = false;
                
            }, function (data) {
                
                if (data.msg) {
                    $.alert("登录失败:" + data.msg);
                } else {
                    $.alert("登录失败:请求错误");
                }
                
                vm.logining = false;

            });

        },

        // 登录成功时调用
        loginSuccess: function (sessionId) {
            
            $.user.setUsername(vm.userid);
            $.user.setPassword(vm.password);
            $.user.setLineId(sessionId);
            //$.user.setLineId(line_id);
            //$.user.setView(view);
            //$.user.setAuth(auth);
            location.href = "/select.html?_=" + new Date().getTime();

        }


    })

    avalon.scan(document.body);

})