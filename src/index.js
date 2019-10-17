module.exports = function solveSudoku(matrix) {
	let count = 1;
	let i, j, vi = [],vj = [];	
	
	function findHoriz(item,a){
		for(let i = 0; i < 9; i++){
			if(matrix[a][i]===item){return true;}
		}
		return false;
	}	
	
	function findVertic(item,b){
		for(let i = 0; i < 9; i++){
			if(matrix[i][b]===item){return true;}
		}
		return false;
	}	
	
	function findCubic(item,a,b){		
		if(a<3){a=0;}
		else if(a<6){a=3;}
		else{a=6;}
	
		if(b<3){b=0;}
		else if(b<6){b=3;}
		else{b=6;}		
		
		for (let r=0+a; r<3+a; r+=1){
			for (let c=0+b; c<3+b; c+=1){		
				if(matrix[r][c]===item){return true;}
			}
		}
		return false;
	}
		
	function findCross(value,x,y){
		if(findHoriz(value,x)||findVertic(value,y)||findCubic(value,x,y)){	
			count++;
			if(count>9){
				count = 1; 
				return true;
			}
			if(!findCross(count,x,y)){return false;}
	
			return true;
		}
		return false;
	}
	
	
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			if(matrix[i][j]==0){
				if(!findCross(count,i,j)){			
					vi.push(i);
					vj.push(j);
					matrix[i][j]=count;						
					count=1;
				}
				else{	
					i = vi[vi.length-1];
					j = vj[vj.length-1];
	
					count = matrix[i][j] + 1;
	
					matrix[i][j]=0;
					j--;
	
					vi.length -= 1;
					vj.length -= 1;
	
					while(count>9){						
						count = matrix[vi[vi.length-1]][vj[vj.length-1]] + 1;
						matrix[vi[vi.length-1]][vj[vj.length-1]]=0;
						
						i = vi[vi.length-1];	
						j = vj[vj.length-1];
						
						vi.length -= 1;
						vj.length -= 1;						
						
						matrix[i][j]=0;
						j--;
					}
				}
			}
		}
	}
	return matrix;
}
