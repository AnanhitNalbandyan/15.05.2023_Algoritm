/*Возьмите реализацию BinaryTree. 
И напишите к каждой строчке комментарий о том, что эта строчка делает
Реализация BinaryTree:
*/
//!Код определяет класс, представляющий узел в двоичном дереве. 
//!Он имеет свойства Node,key,value, left,right

class Node {                    //задаем класс Node
    constructor(key, value) {   // создаем конструктор, с свойствами key, value
        this.key = key;         // обозначаем в конструкторе ключ, по ключу будем находить число
        this.value = value;     // обозначаем в конструкторе value
        this.left = null;       // задаем левую отметку как null
        this.right = null;      // задаем правую отметку как null
    }
}

//!!Код определяет класс, представляющий двоичное дерево. 
//!Он имеет свойство, указывающее на корневой узел дерева.BinaryTree, root
class BinaryTree {                   //задаем класс BinaryTree
    constructor() {                  //создаем конструктор
        this.root = null;            //отмечаем корень- root как null
    }

//!Метод используется для нахождения узла с заданным ключом в двоичном дереве. 
//!Он начинается с корня и итеративно ищет узел с совпадающим ключом, 
//!сравнивая ключ с ключом текущего узла и перемещаясь влево или вправо соответственно. Он возвращает значение найденного узла или если узел не найден.findnull
find(key) {                          //обявляем метод find с аргументом 
    let current = this.root;        // присвоиваем к обявленному текуюему значению null через консруктор значения root

    while (current.key !== key) {   // задаем цикл, пока текущее значение не является тем же знаением
        if (current.key < key) {    // и если текущее key менше key
            current = current.right;//текущему значению присвоиваем значение правой отметки
        } else {                    // а если текущее key больше key
            current = current.left; // текущему значению присвоиваем значение левой отметки
        }
        if (current === null) {     // и если текущее значение null
            return null;            // вернуть null
        }
    }
    return current.value;           //метод возвращает текущее значение с сущностью
}

//!Метод используется для вставки нового узла с заданным ключом и значением
//!в двоичное дерево. Если дерево пустое (корень ), 
//!он создает новый узел и устанавливает его в качестве корня. 
//!В противном случае он вызывает рекурсивный метод, 
//!чтобы найти подходящую позицию для вставки нового узла.insert, null, insertNode

insert(key, value) {                        // обявляем метод insert с агументами key , value
    if (this.root === null) {               // если корень равен null
        this.root = new Node(key, value);   // то корень равен новому классу со свойствами key, value
    } else {
        this.insertNode(this.root, key, value);//или же рекурсивно визивает себя со свойствами key, value insertNode 
    }
}


//!Метод является рекурсивным вспомогательным методом для вставки узла в двоичное дерево. 
//!Он сравнивает ключ с ключом текущего узла и рекурсивно вызывает себя в левом 
//!или правом поддереве, пока не найдет пустое место для вставки нового узла.insertNode

insertNode(node, key, value) {                  // обявляется метод insertNode  с аргументами node, key и value
    if (key < node.key) {                       // сравнивание ключа с текущим ключом текущего узла
        if (node.left === null) {               // если left равен null
            node.left = new Node(key, value);   // то left равен новому классу со свойствами key, value
        } else {
            this.insertNode(node.left, key, value);// или же рекурсивно визивает себя со свойствами key, value insertNode 
        }
    } else {
        if (node.right === null) {                  // если right равен null
            node.right = new Node(key, value);      //то right равен новому классу со свойствами key, value
        } else {
            this.insertNode(node.right, key, value);//или же рекурсивно визивает себя со свойствами key, value insertNode 
        }
    }
}

//!Метод используется для удаления узла с заданным ключом из двоичного дерева. 
//!Он вызывает рекурсивный метод для выполнения операции удаления и 
//!при необходимости обновляет корень.delete, deleteNode

delete(key) {                                            //
    this.root = this.deleteNode(this.root, key);         //
}


//!Этот метод является рекурсивным вспомогательным методом для удаления узла из двоичного дерева. 
//!Он обрабатывает различные случаи в зависимости от того, имеет ли удаляемый узел дочерние элементы, 
//!один дочерний элемент или два дочерних элемента. Он находит подходящий узел замены и соответствующим образом корректирует дерево.deleteNode
deleteNode(node, key) {                                 // обявляется метод deleteNode со свойствами key, value
    if (node === null) {                                // если node равен null
        return null;                                    // вернуть null
    }

    if (key < node.key) {                               //сравнивание ключа с текущим ключом текущего узла
        node.left = this.deleteNode(node.left, key);    //то left равен новому классу со свойствами key, value
        return node;                                    // возвращаем node
    } else if (key > node.key) {                        //сравнивание ключа с текущим ключом текущего узла
        node.right = this.deleteNode(node.right, key);  //то right равен новому классу со свойствами key, value
        return node;                                    //возвращаем node
    } else {
        if (node.left === null && node.right === null) {//если left равен null и одновременно right равен null 
            return null;                                // вернуть null
        }

        if (node.left === null) {                       
            return node.right;                          
        }

        if (node.right === null) {                      
            return node.left;                           
        }

        const minNode = this.findMinNode(node.right);
        node.key = minNode.key;
        node.value = minNode.value;
        node.right = this.deleteNode(node.right, minNode.key);
        return node;
    }
}

//!Метод является рекурсивным вспомогательным методом, который находит узел с минимальным ключом в заданном поддереве. Он проходит через левое поддерево, 
//!пока не достигнет узла с наименьшим ключом.findMinNode
findMinNode(node) {
    if (node.left === null) {
        return node;
    }
    return this.findMinNode(node.left);
}

//!Этот метод используется для печати узлов двоичного дерева при обходе по порядку. 
//!Он вызывает рекурсивный метод для выполнения обхода.print, printNode
print() {
    this.printNode(this.root);
}

//!Этот метод является рекурсивным вспомогательным методом, который печатает узлы двоичного дерева в обходе по порядку. Он рекурсивно проходит по левому поддереву,
//! выводит текущий узел, а затем рекурсивно проходит по правому поддереву.printNode

printNode(node) {
    if (node !== null) {
        this.printNode(node.left);
        console.log(node.key + ": " + node.value);
        this.printNode(node.right);
    }
}

}
const tree = new BinaryTree();
tree.insert(5, "Value 5");
tree.insert(3, "Value 3");
tree.insert(7, "Value 7");
tree.insert(2, "Value 2");
tree.insert(4, "Value 4");
console.log(tree.find(7)); // Output: Node { key: 7, value: 'Value 7', left: null, right: null }
tree.delete(3);
tree.print();
// Output:
// 2: Value 2
// 4: Value 4
// 5: Value 5
// 7: Value 7