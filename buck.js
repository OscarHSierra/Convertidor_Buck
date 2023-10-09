

function dibujar_linea()
{
    var r=document.getElementById("resultado");
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
    var Tm=10;
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
    
    // cx=a*Tm*Tm/(4*b+2*c*Tm+Tm*Tm);
    // console.log("x "+cx);
    // cx1=2*a*Tm*Tm/(4*b+2*c*Tm+Tm*Tm);
    // console.log("x1 "+cx1);
    // cx2=a*Tm*Tm/(4*b+2*c*Tm+Tm*Tm);
    // console.log("x2 "+cx2);
    // cy1=(-8*b+2*Tm*Tm)/(4*b+2*c*Tm+Tm*Tm);
    // console.log("y1 "+cy1);
    // cy2=(4*b-2*c*Tm+Tm*Tm)/(4*b+2*c*Tm+Tm*Tm);
    // console.log("y2 "+cy2);
    
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }


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
                            fontSize: 15,
                            fontStyle: "bold",
                            fontColor: "black"
                        }
                    }
                    ],
            yAxes: [
                {

                      ticks: {
                            beginAtZero: true,
                            steps: 2,
                            stepValue: 100,

                        },
                    scaleLabel: 
                    {
                        display: true,
                        labelString: 'Amplitud',
                        fontSize: 15,
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
                    fontSize: 15,
                    fontStyle: "bold",
                    fontColor: "black"
                 }
            }
       }   
    });

    var res2=0
    var xValues2=[];
    var yValues2=[];
    contador=0;
    aux=0;

    while (contador < 21 )
    {
        aux=Math.pow(2,contador-2);
        res2=20* (Math.log10( Math.sqrt(a*a)/ (Math.sqrt (b*b*aux*aux*aux*aux-2*(b-0.5*c*c)*aux*aux+1) ) ));
        yValues2[contador]=res2.toFixed(2);
        xValues2[contador]=aux;

        contador=contador+1;
        console.log("aux="+aux+" bode="+res2);
    }
   

    new Chart("bode", {
        type: "line",
        data: {
          labels: xValues2,
          datasets: [{
            label: "Bode planta magnitud",
            borderWidth: 4,
            borderColor: "rgba(0,0,100,0.8)",
            pointRadius:0.5,
            data: yValues2,
            fill: false
          }]},
          
          options: {
            
          scales: {

              xAxes: [
                      {

                          scaleLabel: 
                          {
                              display: true,
                              labelString: 'Frecuencia rad/s',
                              fontSize: 15,
                              fontStyle: "bold",
                              fontColor: "black"
                          },                         
                      }
                      ],
              yAxes: [
                  {          
                ticks: {
                    beginAtZero: true,
                    steps: 1,
                    stepValue: 5,

                },

                      scaleLabel: 
                      {
                          display: true,
                          labelString: '20log M',
                          fontSize: 15,
                          fontStyle: "bold",
                          fontColor: "black"
                      },
                  }
                  ]
                  },
              plugins: {
                  title: {
                      display: true,
                      text: 'Bode magnitud',
                      color: 'black',
                      position: 'bottom',
                      fontSize: 15,
                      fontStyle: "bold",
                      fontColor: "black"
                   }
              }
         }   
      });

      var res2=0
      var xValues3=[];
      var yValues3=[];
      contador=0;
      aux=0;
      var signo=0;

      while (contador <21 )
      {
          aux=Math.pow(2,contador-2);
          if(a*c*aux*(b*b*aux*aux*aux*aux-(2*b-c*c)*aux*aux +1)>0)
          {
            signo=1;
          }
          else
          {
            signo=-1
          }
      
          res2=-90*signo-Math.atan((b*aux*aux-1)/(c*aux))*180/Math.PI;
          yValues3[contador]=res2.toFixed(2);
          xValues3[contador]=aux;
  
          contador=contador+1;
          console.log("aux="+aux+" bode="+res2);
      }
     
  
      new Chart("bodefase", {
          type: "line",
          data: {
            labels: xValues3,
            datasets: [{
              label: "Bode planta fase",
              borderWidth: 4,
              borderColor: "rgba(0,0,100,0.8)",
              pointRadius:0.5,
              data: yValues3,
              fill: false
            }]},
            
            options: {
              
            scales: {
  
                xAxes: [
                        {  ticks: {
                            padding: 20
                          },
  
                            scaleLabel: 
                            {
                                display: true,
                                labelString: 'Frecuencia rad/s',
                                fontSize: 15,
                                fontStyle: "bold",
                                fontColor: "black"
                            },                         
                        }
                        ],
                yAxes: [
                    {  
                        ticks: {
                            beginAtZero: true,
                            steps: 2,
                            stepValue: 100,
                            max: 50
                        },
  
                        scaleLabel: 
                        {
                            display: true,
                            labelString: 'Fase(grados)',
                            fontSize: 15,
                            fontStyle: "bold",
                            fontColor: "black"
                        },
                    }
                    ]
                    },
                plugins: {
                    title: {
                        display: true,
                        text: 'Bode fase',
                        color: 'black',
                        position: 'bottom',
                        fontSize: 15,
                        fontStyle: "bold",
                        fontColor: "black"
                     }
                }
           }   
        });

      var Tuo=a/2;
      var MF=52;
      
      var wo=Math.sqrt((R1+rl1+Ron1*D1)/(R1*L1*C1))    
      var fo=wo/(2*Math.PI);
      var fc=fs1/10;
      var fz=fc * (Math.sqrt( (1-Math.sin((MF*Math.PI)/180)) / (1+Math.sin((MF*Math.PI)/180)) ) );
      var fp=fc*(Math.sqrt((1+Math.sin(MF*Math.PI/180))/(1-Math.sin(MF*Math.PI/180))));
      var wz=2*Math.PI*fz;
      var wp=2*Math.PI*fp;
      var fl=(1/10)*fc;
      var wl=2*Math.PI*fl;
      var Gco=Math.pow(fc/fo,2)*Math.sqrt(fz/fp)/Tuo;
      
    


      console.log("wo="+wo);
      console.log("fo="+fo);
      console.log("Tuo="+Tuo);
      console.log("fc="+fc);
      console.log("fz="+fz);       
      console.log("fp="+fp);
      console.log("wz="+wz);
      console.log("fl="+fl);
      console.log("wl="+wl);
      console.log("Gco="+Gco);

      var Kp=Gco*(wl*wp-wl*wz+wp*wz)/(wp*wz);
      var Ki=Gco*wl;
      var Kd=Gco*(wl*wp-wl*wz+wp*wz-wp*wp)/(wp*wp*wz);

      r.innerHTML="Kp="+Kp.toFixed(5)+"<br/>"+"Ki="+Ki.toFixed(5)+"<br/>"+"Kd="+ Kd.toFixed(5); 


      console.log("Kp="+Kp);
      console.log("Ki="+Ki);
      console.log("Kd="+Kd);

    }
   



boton.addEventListener("click",dibujar_linea);