import os
import getpass


from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.document_loaders import TextLoader
from langchain.document_loaders import TextLoader
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

import openai
import pinecone

# initialize pinecone
pinecone.init(
    api_key=os.getenv("PINECONE_API_KEY"),  # find at app.pinecone.io
    environment=os.getenv("PINECONE_ENV"),  # next to api key in console
)

def createIndex(text = "./andromious.txt", index_name = "scribe"): 
    # Wherever we're storing the documents for text 
    loader = TextLoader(text)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    # First, check if our index already exists. If it doesn't, we create it
    if index_name not in pinecone.list_indexes():
        # we create a new index
        pinecone.create_index(
        name=index_name,
        metric='cosine',
        dimension=1536  
    )

    # The OpenAI embedding model `text-embedding-ada-002 uses 1536 dimensions`
    docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name)

    return docsearch; 

def queryDatabase(query, index_name = "scribe"): 
    embeddings = OpenAIEmbeddings()
    # Load existing index
    docsearch = Pinecone.from_existing_index(index_name, embeddings)
    docs = docsearch.similarity_search(query)
    print(docs[0].page_content)
    return docs[0].page_content

# Add Text to Existing Index 
def addToIndex(text, index_name = "scribe"): 
    embeddings = OpenAIEmbeddings()
    index = pinecone.Index(index_name)
    vectorstore = Pinecone(index, embeddings.embed_query, "text")
    vectorstore.add_texts(text)

def addDocuments(text, index_name = "scribe"): 
    loader = TextLoader(text)
    documents = loader.load()
    embeddings = OpenAIEmbeddings()
    index = pinecone.Index(index_name)
    vectorstore = Pinecone(index, embeddings.embed_query, "text")
    vectorstore.add_documents(documents)

   
def llmQuery(query, index_name = "scribe"): 
    # completion llm
    llm = ChatOpenAI(
        openai_api_key= os.getenv("OPENAI_API_KEY"),
        model_name='gpt-3.5-turbo',
        temperature=0.0
    )

    context = queryDatabase(query)

    prompt = "Answer the following question with provided context: " + query + "\nContext : " + context

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    print(response['choices'][0]['message']['content'])

    

addDocuments("./andromious3.txt")
llmQuery("What color hair do Portuguese women have?")