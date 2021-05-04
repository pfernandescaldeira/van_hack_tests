
var children = [] 

const prioritizeNodes = (tree, targetVal) => {
    
    looping(tree, targetVal)
    rescueNodes(tree)

    const expected = {
        val     : 1,
        children: children 
    }

      
  
  console.log(" " )
  console.log(" " )
  console.log(expected )

  return expected
};
  

function findTarget(tree, targetVal) {

    if (tree.val == targetVal) { 
           
        children.push( {
                val     : tree.val,
                children: tree.children
            }     
        )

        tree.flag = true;
    }


    var findChidren = tree.children.find(el => el.val == targetVal);

    if (findChidren) {

        children.push( {
                val     : tree.val,
                children: tree.children
            }     
        )

        tree.flag = true;
    } 
 
    looping(tree.children,targetVal)    
} 


function rescueNodes(tree){
         
    var children_length = tree.children.length        

    for(i= 0 ; i < children_length ; i++){
        
        if(! tree.children[i].flag ){

            children.push( {
                    val     : tree.children[i].val,
                    children: tree.children[i].children
                }     
            )

        } else {
            delete tree.children[i].flag
        }
    } 
}

function looping(tree, targetVal){
    
    if ( Array.isArray(tree.children) ) {  
        
        var children_length = tree.children.length      

        for(i= 0 ; i < children_length ; i++){
            
            findTarget( tree.children[i] , targetVal) 
        }
    }
}
     
const tree = {
val: 1,
children: [
    {
    val: 1,
    children: [
        {val: 7}
    ]
    },
    {
    val: 3,
    children: [
        {val: 55}
    ]
    },
    {
    val: 2,
    children: [
        {val: 15}
    ]
    },
    {
    val: 7,
    children: [
        {val: 2}
    ]
    }
]
};  


 

prioritizeNodes(tree,2)  

  
  
  console.log(" " )
  console.log(" " )
  console.log(tree )
  

