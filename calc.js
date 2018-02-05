/* var Math = Math || {};

Math.Calculator = function(id){
    console.log("id = " + id);
};

var s = new Math.Calculator(123);  */


var calculator = (function(id){
    var el = document.getElementById(id);
    var operation, x = '' , y = '', xSet = false, opDone = false;
    return {
        calculate : function(){
            var result = 0;
            switch (operation){
                case '+' :
                    result = parseInt(x) + parseInt(y);
                    break;
                case '-' :
                    result = parseInt(x) - parseInt(y);
                    break;
                case '*' :
                    result = parseInt(x) * parseInt(y);
                    break;
                case '/' :
                    if(y == 0){
                        alert("Cannot divide by zero!");
                        return;
                    }
                    result = parseInt(x) / parseInt(y);
                    break;
            }
			console.log("x = " + x + ", y = " + y);
            opDone = true;
            el.innerText = result;
            x = result; 
            y = "";
            return result;
        },
        setOperation: function(oper){
            operation = oper;
            xSet = true;
            opDone = false;
            el.innerText += " " + oper;
        },
        setNumber: function(value){
            if(opDone){
                xSet = false;
                opDone = false;
                x = "";
                el.innerText = x;
            }

            if(xSet){
                y += value;
                el.innerText += value;
            }else{
                x += value;
                el.innerText += value;
            }
        }
    };
}("output"));

