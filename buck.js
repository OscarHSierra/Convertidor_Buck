

function dibujar_linea()
{
    var Vg= document.getElementById("input_Vg");
    var Vd= document.getElementById("input_Vd");
    var Vo= document.getElementById("input_Vo");
    var Ron= document.getElementById("input_Ron");
    var R= document.getElementById("input_R");
    var C= document.getElementById("input_C");
    var L= document.getElementById("input_L");
    var rl= document.getElementById("input_rl");
    var fs= document.getElementById("input_fs");
    
    var Vg1=parseFloat(Vg.value);
    var Vd1=parseFloat(Vd.value);
    var Vo1=parseFloat(Vo.value);
    var Ron1=parseFloat(Ron.value);
    var R1=parseFloat(R.value);
    var C1=parseFloat(C.value)/1000000;
    var L1=parseFloat(L.value)/1000000;
    var rl1=parseFloat(rl.value);
    var fs1=parseFloat(fs.value);
    
    
    var boton=document.getElementById("boton");
    
    var IL1=0;
    var D1=0;
    var Tm1=0;
    var Gd01=0;
    var w01=0;
    var f01=0;
    var Q1=0;
    var test=0;
    var a=0;
    var b=0;
    var c=0;
    var cx=0;
    var cx1=0;
    var cx2=0;
    var cy1=0;
    var cy2=0;
    
    
    IL1=Vo1/R1;
    D1=(IL1*rl1+Vd1+Vo1)/(Vg1-IL1*Ron1+Vd1); 
    Gd01=(R1*(Vg1+Vd1)-Ron1*Vo1)/(R1+rl1+Ron1*D1);
    wo1=Math.sqrt((R1+rl1+Ron1*D1)/(R1*L1*C1));
    fo1=wo1/(2*Math.PI);
    Q1=R1 * Math.sqrt ((L1*C1*(R1+rl1+Ron1*D1)) / (R1*Math.pow(((L1+R1*C1*rl1+R1*C1*Ron1*D1)),2)))
    console.log("IL="+IL1);
    console.log("D="+D1);
    console.log("Gd0="+Gd01);
    console.log("wo="+wo1);
    console.log("fo="+fo1);
    console.log("Q="+Q1);
    
    a=Gd01;
    b=1/Math.pow(wo1,2)
    c=1/(Q1*wo1);
    console.log("a="+a);
    console.log("b="+b);
    console.log("c="+c);
    cx=2.5e-9*a/(b+50e-6*(c+50e-6))
    console.log("x "+cx);
    cx1=5e-9*a/(b+50e-6*(c+50e-6))
    console.log("x1 "+cx1);
    cx2=2.5e-9*a/(b+50e-6*(c+50e-6))
    console.log("x2 "+cx2);
    cy1=2*(b-2.5e-9)/(b+50e-6*(c+50e-6))
    console.log("y1 "+cy1);
    cy2=-(b-50e-6*(c-50e-6))/(b+50e-6*(c+50e-6))
    console.log("y2 "+cy2);
    



    var y2=0;
    var y1=0;
    var x1=0;
    var x2=0;
    var x=1;
    var res;
    var contador=0;   
    var aux=0;
    var yValues = [];
    var xValues = [];
  
    while (contador < 50)
    {
        x=1;
        res=cy2*y2+cy1*y1 + cx2*x2 +cx1*x1 +cx*x;
        xValues[contador]=res.toFixed(2);
        yValues[contador] =contador;

        aux++;
        contador++;

        y2=y1;
        y1=res;
        x2=x1;
        x1=x;
    }


    Chart.defaults.global.defaultFontStyle = 'Bold'
    new Chart("myChart", {
      type: "line",
      data: {
        labels: yValues,
        datasets: [{
          label: "Planta",
          borderWidth: 4,
          borderColor: "rgba(0,0,100,0.8)",
          pointRadius:0.5,
          data: xValues,
          fill: false
        }]},
        options: {
        scales: {
            xAxes: [
                    {
                        scaleLabel: 
                        {
                            display: true,
                            labelString: 'Tiempo(uS)',
                            fontSize: 20,
                            fontStyle: "bold",
                            fontColor: "black"
                        }
                    }
                    ],
            yAxes: [
                {
                    scaleLabel: 
                    {
                        display: true,
                        labelString: 'Amplitud',
                        fontSize: 20,
                        fontStyle: "bold",
                        fontColor: "black"
                    }
                }
                ]
                },
            plugins: {
                title: {
                    display: true,
                    text: 'write heading here',
                    color: 'black',
                    position: 'bottom',
                    fontSize: 20,
                    fontStyle: "bold",
                    fontColor: "black"
                 }
            }
       }   
    });

}
   






boton.addEventListener("click",dibujar_linea);